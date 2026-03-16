"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SittersController = void 0;
const common_1 = require("@nestjs/common");
const sitters_service_1 = require("./sitters.service");
let SittersController = class SittersController {
    sittersService;
    constructor(sittersService) {
        this.sittersService = sittersService;
    }
    parseIncludeDemo(includeDemo) {
        return includeDemo?.trim().toLowerCase() === 'true';
    }
    async list(featured, search, tag, city, district, includeDemo) {
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
    async findProfile(id, includeDemo) {
        return this.sittersService.getSitterProfileById(id, {
            includeDemo: this.parseIncludeDemo(includeDemo),
        });
    }
    async findOne(id, includeDemo) {
        return this.sittersService.getSitterById(id, {
            includeDemo: this.parseIncludeDemo(includeDemo),
        });
    }
};
exports.SittersController = SittersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('featured')),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('tag')),
    __param(3, (0, common_1.Query)('city')),
    __param(4, (0, common_1.Query)('district')),
    __param(5, (0, common_1.Query)('includeDemo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], SittersController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id/profile'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('includeDemo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SittersController.prototype, "findProfile", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('includeDemo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SittersController.prototype, "findOne", null);
exports.SittersController = SittersController = __decorate([
    (0, common_1.Controller)('sitters'),
    __metadata("design:paramtypes", [sitters_service_1.SittersService])
], SittersController);
//# sourceMappingURL=sitters.controller.js.map