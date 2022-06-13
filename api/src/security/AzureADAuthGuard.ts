import { AuthGuard } from "@nestjs/passport";
import { strategyName } from "./AzureADStrategy";

export class AzureADAuthGuard extends AuthGuard(strategyName) {
    
}