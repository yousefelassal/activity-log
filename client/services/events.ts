import axios from "axios";
import { baseUrl } from "@/lib/utils";
import { z } from 'zod';
import InstaLog from 'instalog-logger';

export const instalog = new InstaLog('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cF9pZCI6IklOU1RBVFVTLVBMS0FEU0lRMzIwIiwiaWF0IjoxNzE5NDExODc1fQ.qe8-fAwmXPiU0w8VsJ7BRBDGR2pB_OyjPiFguh_irJU');


const eventSchema = z.object({
    actor_id: z.string().min(1, 'Actor ID is required'),
    action: z.object({
        id: z.string().min(1, 'Action ID is required'),
        object: z.string(),
        name: z.string().min(1, 'Action name is required'),
    }),
    object: z.string(),
    target_id: z.string().min(1, 'Target ID is required'),
    target_name: z.string().min(1, 'Target name is required'),
    location: z.string().min(1, 'Location is required'),
    metadata: z.object({
        redirect: z.string(),
        description: z.string(),
        x_request_id: z.string(),
    }),
});


type Event = z.infer<typeof eventSchema>;

const allEvents = z.object({
    id: z.string(),
    actor: z.object({
        email: z.string(),
        name: z.string(),
    }),
    action_name: z.string(),
    occurred_at: z.string(),
});

export type AllEvents = z.infer<typeof allEvents>;

const singleEvent = z.object({
    id: z.string(),
    actor: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        group_id: z.string(),
    }),
    action_id: z.string(),
    action_name: z.string(),
    object: z.string(),
    target_id: z.string(),
    target_name: z.string(),
    location: z.string(),
    metadata: z.object({
        redirect: z.string(),
        description: z.string(),
        x_request_id: z.string(),
    }),
    occurred_at: z.string(),
});

type SingleEvent = z.infer<typeof singleEvent>;

const filterOptions = z.object({
  actors: z.array(z.object({
      _count: z.object({
        actor_id: z.number(),
      }),
      actor_id: z.string(),
  })),
  targets: z.array(z.object({
      _count: z.object({
        target_id: z.number(),
      }),
      target_id: z.string(),
  })),
  actionNames: z.array(z.object({
      _count: z.object({
        action_name: z.number(),
      }),
      action_name: z.string(),
  })),
});

type FilterOptions = z.infer<typeof filterOptions>;

export async function getEvents(url:string): Promise<AllEvents[]> {
  const { data } = await axios.get(url, {
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cF9pZCI6IklOU1RBVFVTLVBMS0FEU0lRMzIwIiwiaWF0IjoxNzE5NDExODc1fQ.qe8-fAwmXPiU0w8VsJ7BRBDGR2pB_OyjPiFguh_irJU'
    }
  });
  return data;
}

export async function getEvent(url:string): Promise<SingleEvent> {
  const { data } = await axios.get(url, {
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cF9pZCI6IklOU1RBVFVTLVBMS0FEU0lRMzIwIiwiaWF0IjoxNzE5NDExODc1fQ.qe8-fAwmXPiU0w8VsJ7BRBDGR2pB_OyjPiFguh_irJU'
    }
  });
  return data;
}

export async function getEventsCSV(url:string): Promise<string> {
  const { data } = await axios.get(url, {
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cF9pZCI6IklOU1RBVFVTLVBMS0FEU0lRMzIwIiwiaWF0IjoxNzE5NDExODc1fQ.qe8-fAwmXPiU0w8VsJ7BRBDGR2pB_OyjPiFguh_irJU'
    }
  });
  return data;
}

export async function getEventsFilterOptions(url:string): Promise<FilterOptions> {
  const { data } = await axios.get(url, {
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cF9pZCI6IklOU1RBVFVTLVBMS0FEU0lRMzIwIiwiaWF0IjoxNzE5NDExODc1fQ.qe8-fAwmXPiU0w8VsJ7BRBDGR2pB_OyjPiFguh_irJU'
    }
  });
  return data;
}

export async function createEvent(event:Event): Promise<Event> {
  const { data } = await axios.post(`${baseUrl}/events`, event, {
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cF9pZCI6IklOU1RBVFVTLVBMS0FEU0lRMzIwIiwiaWF0IjoxNzE5NDExODc1fQ.qe8-fAwmXPiU0w8VsJ7BRBDGR2pB_OyjPiFguh_irJU'
    }
  });
  return data;
}