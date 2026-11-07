export interface Page<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total_items: number;
    total_pages: number;
  };
}

export function getSkip(page: number, limit: number): number {
  return (page - 1) * limit;
}

export function paginate<T>(items: T[], total: number, page: number, limit: number): Page<T> {
  return {
    data: items,
    meta: {
      page,
      limit,
      total_items: total,
      total_pages: Math.ceil(total / limit),
    },
  };
}