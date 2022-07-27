import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { Origin } from "src/commons/decorators/origin.decorator";
import { QueryDataConfigInput } from "src/commons/graphql/query-data-config.input";
import { IUser } from "src/users/interfaces/user.interface";
import { Reservation } from "./dto/reservation.entity";
import { ReservationInput } from "./dto/reservation.input";
import { IReservation } from "./interfaces/reservation.interface";
import { ReservationsService } from "./reservations.service";

@UseGuards(AuthGuard)
@Resolver()
export class RerservationResolver {
    constructor(
        private readonly reservationService: ReservationsService
    ) {}

    @Mutation(returns => Reservation)
    async makeReservation(
        @Args({ name: 'reservationInput', type: () => ReservationInput }) reservationInput: IReservation,
        @CurrentUser() currentUser: IUser
    ): Promise<IReservation> {
        return this.reservationService.insertOne({...reservationInput, client: currentUser.id} as IReservation);
    }

    @Query(returns => [Reservation])
    async fetchReservations(
        @Origin() origin: string,
        @Args({ name: 'queryDataConfigInput', type: () => QueryDataConfigInput, nullable: true }) queryDataConfigInput: QueryDataConfigInput
    ): Promise<IReservation[]> {
        console.log({origin})
        return this.reservationService.findAll(queryDataConfigInput);
    }
}