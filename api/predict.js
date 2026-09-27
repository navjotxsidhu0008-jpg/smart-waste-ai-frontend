export default function handler(req, res) {
  const rules = [
    {
      category: 'Plastic',
      recommended_bin: '♻️ Plastic Bin',
      bin_short: 'Plastic Bin',
      icon: '♻️',
      bin_color: '#3b82f6',
      badge_bg: 'rgba(59, 130, 246, 0.15)',
      instruction: 'Place plastic waste in the plastic recycling bin. Empty liquids and rinse bottles before disposal.',
      eco_tip: 'Recycling one plastic bottle saves enough energy to power an LED lamp for over 24 hours.',
      recyclable: true,
      examples: ['Bottles', 'Containers', 'Packaging']
    },
    {
      category: 'Paper',
      recommended_bin: '📄 Paper Bin',
      bin_short: 'Paper Bin',
      icon: '📄',
      bin_color: '#0ea5e9',
      badge_bg: 'rgba(14, 165, 233, 0.15)',
      instruction: 'Place clean and dry paper or cardboard into the paper recycling stream.',
      eco_tip: 'Recycling paper saves trees and water while reducing landfill demand.',
      recyclable: true,
      examples: ['Cards', 'Newspaper', 'Boxes']
    },
    {
      category: 'Metal',
      recommended_bin: '🥫 Metal Bin',
      bin_short: 'Metal Bin',
      icon: '🥫',
      bin_color: '#f59e0b',
      badge_bg: 'rgba(245, 158, 11, 0.15)',
      instruction: 'Empty liquids and place clean metal items into the metal recycling stream.',
      eco_tip: 'Metal is infinitely recyclable and uses much less energy when reprocessed.',
      recyclable: true,
      examples: ['Cans', 'Foil', 'Caps']
    },
    {
      category: 'Glass',
      recommended_bin: '🍾 Glass Bin',
      bin_short: 'Glass Bin',
      icon: '🍾',
      bin_color: '#06b6d4',
      badge_bg: 'rgba(6, 182, 212, 0.15)',
      instruction: 'Rinse bottles and jars before placing them in the glass recycling stream.',
      eco_tip: 'Glass is endlessly recyclable and can be remade without loss of quality.',
      recyclable: true,
      examples: ['Bottles', 'Jars', 'Flasks']
    },
    {
      category: 'Organic',
      recommended_bin: '🌱 Organic/Wet Waste Bin',
      bin_short: 'Organic/Wet Waste Bin',
      icon: '🌱',
      bin_color: '#10b981',
      badge_bg: 'rgba(16, 185, 129, 0.15)',
      instruction: 'Place food scraps and biodegradable matter into the compost or organic stream.',
      eco_tip: 'Composting organic waste reduces methane emissions and creates nutrient-rich soil.',
      recyclable: true,
      examples: ['Fruit peels', 'Coffee grounds', 'Leftover food']
    },
    {
      category: 'General Waste',
      recommended_bin: '🗑️ General Waste Bin',
      bin_short: 'General Waste Bin',
      icon: '🗑️',
      bin_color: '#64748b',
      badge_bg: 'rgba(100, 116, 139, 0.15)',
      instruction: 'Dispose of non-recyclable or contaminated waste in the general trash stream.',
      eco_tip: 'Reduce general waste by reusing items and avoiding single-use mixed materials.',
      recyclable: false,
      examples: ['Wrappers', 'Mixed plastics', 'Soiled items']
    }
  ];

  res.status(200).json({ count: rules.length, rules });
}
