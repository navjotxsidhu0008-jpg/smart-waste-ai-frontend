export default function handler(req, res) {
  const now = new Date();
  const totals = {
    total_detections: 128,
    today_detections: 43,
    category_counts: {
      Plastic: 29,
      Paper: 18,
      Metal: 21,
      Glass: 16,
      Organic: 26,
      'General Waste': 18
    },
    distribution: {
      Plastic: { count: 29, percentage: 22.7 },
      Paper: { count: 18, percentage: 14.1 },
      Metal: { count: 21, percentage: 16.4 },
      Glass: { count: 16, percentage: 12.5 },
      Organic: { count: 26, percentage: 20.3 },
      'General Waste': { count: 18, percentage: 14.1 }
    },
    most_frequent_category: 'Plastic',
    most_frequent_count: 29,
    categories: ['Plastic', 'Paper', 'Metal', 'Glass', 'Organic', 'General Waste'],
    recyclable_share_pct: 85.9
  };

  res.status(200).json({
    ...totals,
    generated_at: now.toISOString()
  });
}
