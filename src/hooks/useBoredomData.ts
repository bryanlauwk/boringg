import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

interface Pixel {
  id: number;
  color: string;
  isNew?: boolean;
}

const GRID_SIZE = 50;
const COLORS = ['coral', 'yellow', 'green', 'cyan', 'purple', 'pink', 'white'];

export const useBoredomData = () => {
  const [totalClicks, setTotalClicks] = useState(0);
  const [activeUsers, setActiveUsers] = useState(1);
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const presenceChannelRef = useRef<RealtimeChannel | null>(null);

  // Derived values
  const saturation = Math.min(100, Math.round((pixels.length / (GRID_SIZE * GRID_SIZE)) * 100));
  const currentEra = Math.floor(totalClicks / 5000) + 1;
  const boredomPercentage = Math.min(100, Math.round((totalClicks / 10000) * 100));

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch stats
        const { data: statsData } = await supabase
          .from('boredom_stats')
          .select('total_clicks')
          .eq('id', 'global')
          .maybeSingle();

        if (statsData) {
          setTotalClicks(statsData.total_clicks);
        }

        // Fetch pixels
        const { data: pixelsData } = await supabase
          .from('boredom_pixels')
          .select('position, color');

        if (pixelsData) {
          setPixels(pixelsData.map(p => ({ id: p.position, color: p.color })));
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Set up real-time subscriptions
  useEffect(() => {
    // Subscribe to stats changes
    channelRef.current = supabase
      .channel('boredom-realtime')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'boredom_stats'
        },
        (payload) => {
          console.log('Stats update:', payload);
          if (payload.new && 'total_clicks' in payload.new) {
            setTotalClicks(payload.new.total_clicks as number);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'boredom_pixels'
        },
        (payload) => {
          console.log('Pixel update:', payload);
          if (payload.new && 'position' in payload.new && 'color' in payload.new) {
            const newPixel = { 
              id: payload.new.position as number, 
              color: payload.new.color as string, 
              isNew: true 
            };
            setPixels(prev => {
              const filtered = prev.map(p => ({ ...p, isNew: false })).filter(p => p.id !== newPixel.id);
              return [...filtered, newPixel];
            });
          }
        }
      )
      .subscribe();

    // Set up presence for active users
    presenceChannelRef.current = supabase
      .channel('boredom-presence', {
        config: { presence: { key: crypto.randomUUID() } }
      })
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannelRef.current?.presenceState();
        if (state) {
          const count = Object.keys(state).length;
          setActiveUsers(Math.max(1, count));
        }
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await presenceChannelRef.current?.track({
            online_at: new Date().toISOString()
          });
        }
      });

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
      if (presenceChannelRef.current) {
        supabase.removeChannel(presenceChannelRef.current);
      }
    };
  }, []);

  // Handle button click
  const handleClick = useCallback(async () => {
    const randomPosition = Math.floor(Math.random() * GRID_SIZE * GRID_SIZE);
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];

    // Optimistic update for local feel
    setTotalClicks(prev => prev + 1);
    setPixels(prev => {
      const updated = prev.map(p => ({ ...p, isNew: false }));
      const existingIndex = updated.findIndex(p => p.id === randomPosition);
      if (existingIndex >= 0) {
        updated[existingIndex] = { id: randomPosition, color: randomColor, isNew: true };
      } else {
        updated.push({ id: randomPosition, color: randomColor, isNew: true });
      }
      return updated;
    });

    try {
      // Update stats - increment total clicks
      await supabase.rpc('increment_clicks');

      // Upsert pixel
      await supabase
        .from('boredom_pixels')
        .upsert({ position: randomPosition, color: randomColor }, { onConflict: 'position' });

    } catch (error) {
      console.error('Error updating boredom data:', error);
    }
  }, []);

  return {
    totalClicks,
    activeUsers,
    pixels,
    isLoading,
    handleClick,
    saturation,
    currentEra,
    boredomPercentage,
    gridSize: GRID_SIZE
  };
};