import { Controller, Get } from '@nestjs/common';

@Controller() // No path - responds to root "/"
export class HealthController {
  @Get()
  check() {
    return {
      service: 'Therapy Session Backend API',
      status: 'ok',
      environment: process.env.NODE_ENV || 'development',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
  }
}
