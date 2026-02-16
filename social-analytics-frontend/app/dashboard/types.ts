export interface StatMetric {
  title: string;
  value: number;
  change?: number;
  positive?: boolean;
  subtitle?: string;
}

export interface FollowersPoint {
  date: string;
  followers: number;
}

export interface DashboardResponse {
  stats: StatMetric[];
  followersGrowth: FollowersPoint[];
}
