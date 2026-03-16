import { Controller, Get, Param, Query } from '@nestjs/common';
import { SittersService } from './sitters.service';

@Controller('sitters')
export class SittersController {
  constructor(private readonly sittersService: SittersService) { }

  private parseIncludeDemo(includeDemo?: string): boolean {
    return includeDemo?.trim().toLowerCase() === 'true';
  }

  @Get()
  async list(
    @Query('featured') featured?: string,
    @Query('search') search?: string,
    @Query('tag') tag?: string,
    @Query('city') city?: string,
    @Query('district') district?: string,
    @Query('includeDemo') includeDemo?: string,
  ) {
    const includeDemoData = this.parseIncludeDemo(includeDemo);

    if (featured === 'true') {
      return this.sittersService.getFeaturedSitters({
        search,
        tag,
        city,
        district,
      }, {
        includeDemo: includeDemoData,
      });
    }

    return this.sittersService.getAllSitters({
      search,
      tag,
      city,
      district,
    }, {
      includeDemo: includeDemoData,
    });
  }

  @Get(':id/profile')
  async findProfile(
    @Param('id') id: string,
    @Query('includeDemo') includeDemo?: string,
  ) {
    return this.sittersService.getSitterProfileById(id, {
      includeDemo: this.parseIncludeDemo(includeDemo),
    });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('includeDemo') includeDemo?: string,
  ) {
    return this.sittersService.getSitterById(id, {
      includeDemo: this.parseIncludeDemo(includeDemo),
    });
  }
}
