export interface Results {
    meta: Meta;
    links: Links;
    data: Organization[];
  }

  export interface Result {
    data: Organization;
  }

  export interface Organization {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  }

  export interface Links {
    prev: string;
    last: string;
    next: string;
    first: string;
  }

  export interface Meta {
    to: number;
    from: number;
    path: string;
    total: number;
    per_page: number;
    last_page: number;
    current_page: number;
  }

  export interface OrganizationParams {
    page?: number;
    perPage?: number;
    search?: string;
    isActive?: boolean;
  }