import type { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';

export function gameChannel(roomId: string): RealtimeChannel {
  return supabase.channel(`game:${roomId}`, {
    config: {
      private: true,
      broadcast: { self: true, ack: true },
    },
  });
}

export async function joinGameRoom(roomId: string, onEvent: (event: unknown) => void) {
  const channel = gameChannel(roomId);
  channel.on('broadcast', { event: 'game-event' }, ({ payload }) => onEvent(payload));
  const status = await channel.subscribe();
  if (status !== 'SUBSCRIBED') throw new Error(`Unable to subscribe to game room ${roomId}: ${status}`);
  return channel;
}

export async function broadcastGameEvent(channel: RealtimeChannel, payload: unknown) {
  const result = await channel.send({
    type: 'broadcast',
    event: 'game-event',
    payload,
  });
  if (result !== 'ok') throw new Error(`Realtime broadcast failed: ${result}`);
}
