import { DashboardResponse } from "./types";

export async function getDashboardData(): Promise<DashboardResponse> {
  // simulate network delay
  await new Promise((res) => setTimeout(res, 1200));

  return {
    stats: [
      {
        title: "Followers",
        value: 12430,
        change: 4.2,
        positive: true,
      },
      {
        title: "Engagement",
        value: 8.1,
        change: -1.1,
        positive: false,
      },
      {
        title: "Posts",
        value: 342,
        subtitle: "This month",
      },
      {
        title: "Reach",
        value: 98200,
        change: 12,
        positive: true,
      },
    ],
    followersGrowth: [
      { date: "Jan", followers: 8000 },
      { date: "Feb", followers: 8500 },
      { date: "Mar", followers: 9200 },
      { date: "Apr", followers: 10000 },
      { date: "May", followers: 11000 },
      { date: "Jun", followers: 12430 },
    ],
  };
}
