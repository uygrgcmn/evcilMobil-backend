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
exports.ReservationsController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const current_user_decorator_1 = require("../auth/current-user.decorator");
const reservations_service_1 = require("./reservations.service");
let ReservationsController = class ReservationsController {
    reservationsService;
    constructor(reservationsService) {
        this.reservationsService = reservationsService;
    }
    async inbox(user, status) {
        return this.reservationsService.getInbox(user, status);
    }
    async outbox(user, status) {
        return this.reservationsService.getOutbox(user, status);
    }
    async create(user, body) {
        return this.reservationsService.createReservation(user, body);
    }
    async createFromThread(user, threadId, body) {
        return this.reservationsService.createReservationFromThread(user, threadId, body);
    }
    async decide(user, id, body) {
        return this.reservationsService.decideReservation(user, id, body.action);
    }
    async cancel(user, id) {
        return this.reservationsService.cancelReservation(user, id);
    }
    async getReport(user, id) {
        return this.reservationsService.getReservationReport(user, id);
    }
    async upsertReport(user, id, body) {
        return this.reservationsService.upsertReservationReport(user, id, body);
    }
    async getSitterAvailability(sitterId, from, to) {
        return this.reservationsService.getSitterAvailability(sitterId, from, to);
    }
    async setMyAvailability(user, body) {
        return this.reservationsService.setMyAvailability(user, body.days ?? []);
    }
};
exports.ReservationsController = ReservationsController;
__decorate([
    (0, common_1.Get)('inbox'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "inbox", null);
__decorate([
    (0, common_1.Get)('outbox'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "outbox", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('from-thread/:threadId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('threadId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "createFromThread", null);
__decorate([
    (0, common_1.Post)(':id/decision'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "decide", null);
__decorate([
    (0, common_1.Post)(':id/cancel'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "cancel", null);
__decorate([
    (0, common_1.Get)(':id/report'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "getReport", null);
__decorate([
    (0, common_1.Post)(':id/report'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "upsertReport", null);
__decorate([
    (0, common_1.Get)('availability/:sitterId'),
    __param(0, (0, common_1.Param)('sitterId')),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "getSitterAvailability", null);
__decorate([
    (0, common_1.Put)('availability'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "setMyAvailability", null);
exports.ReservationsController = ReservationsController = __decorate([
    (0, common_1.Controller)('reservations'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [reservations_service_1.ReservationsService])
], ReservationsController);
//# sourceMappingURL=reservations.controller.js.map