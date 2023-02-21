export interface IResultsProps {
  success: boolean;
  message: string;
  data?: [];
  error?: string;
}

export interface IGroupsProps {
  id: number;
  name: string;
  description: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface IResourcesProps {
  id: number;
  name: string;
  description: string;
  status: "ACTIVE" | "INACTIVE";
  permissions: string;
}
