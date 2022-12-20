import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { Guid } from "guid-typescript";
import { request } from "http";
import { JwtAuthGuard } from "src/shared/guards/auth.guard";
import { RoleInterceptor } from "src/shared/intercerptos/role.interceptor";
import { AuthService } from "src/shared/services/auth.service";
import { AuthenticateDto } from "../dtos/account/authenticate.dto";
import { ChangePasswordDto } from "../dtos/account/change-password.dto";
import { ResetPasswordDto } from "../dtos/account/reset-password.dto";
import { Result } from "../models/result.model";
import { AccountService } from "../services/account.service";

@Controller('v1/accounts')
export class AccountController {
    constructor(
        private readonly authService: AuthService,
        private readonly accountService: AccountService
    ) {

    }

    //Autenticar
    @Post('authenticate')
    async authenticate(@Body() model: AuthenticateDto): Promise<any> {
        const customer = await this.accountService.authenticate(model.username, model.password);

        //Caso não encontre o usuário
        if (!customer) {
            throw new HttpException(new Result('Usuário ou senha inválidos', false, null, null), HttpStatus.NOT_FOUND);
        }

        //Caso o usuário esteja inativo
        if (!customer.user.active) {
            throw new HttpException(new Result("Usuário inativo", false, null, null), HttpStatus.UNAUTHORIZED);
        }

        //Gera o token
        const token = await this.authService.createToken(customer.document, customer.email, '', customer.user.roles);
        return new Result(null, true, token, null);
    }

    //Resetar a senha
    @Post('reset-password')
    async resetPassword(@Body() model: ResetPasswordDto): Promise<any> {
        try {
            //TODO: Enviar email com a senha

            const password = Guid.create().toString().substring(0, 8).replace('-', '');
            await this.accountService.update(model.document, { password: password });
            return new Result('Uma nova senha foi enviada para seu email', true, null, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possivel restaurar a sua senha', false, null, null), HttpStatus.BAD_REQUEST);
        }
    }

    //Alterar Senha
    @Post('change-password')
    @UseGuards(JwtAuthGuard)
    async changePassword(@Req() request, @Body() model: ChangePasswordDto): Promise<any> {
        try {
            //TODO: Encriptar senha

            await this.accountService.update(request.user.document, { password: model.newPassword });
            return new Result('Sua senha foi alterada com sucesso!', true, null, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível alterar sua seha', false, null, null), HttpStatus.BAD_REQUEST);
        }
    }

    //Refresh token
    @Post('refresh')
    @UseGuards(JwtAuthGuard)
    async refreshToken(@Req() request): Promise<any>{
        //Gera o token
        const token = await this.authService.createToken(request.user.document, request.user.email, '', request.user.roles);
        return new Result(null, true, token, null);
    }
}