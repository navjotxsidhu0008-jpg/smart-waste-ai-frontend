export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    app: 'AI Smart Waste Management',
    version: '1.0.0',
    model_ready: true,
    database_ready: true,
    timestamp: new Date().toISOString()
  });
}
