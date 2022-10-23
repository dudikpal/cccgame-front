import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable()
export class AdminService {

    public adminCards! : any[];

    public updatedCard: any;


    fetchCards(params: any) {

        const result = async () => {
            //const response = await fetch(this.url + '/find', {
            const response = await fetch(environment.endpointPrefix + '/api/cards/find', {
                method: "POST",
                body: params,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const jsonResponse = await response.json();
            this.adminCards = jsonResponse;

            this.adminCards.sort((a, b) => a.card.value.manufacturer.value.localeCompare(b.card.value.manufacturer.value));
            //console.log(this.cardList);
        };

        return result();
    }


    updateCard(updatedCard: any) {

        fetch(environment.endpointPrefix + '/api/cards', {
            method: "PUT",
            body: JSON.stringify(updatedCard),
            headers: {
                "Content-Type": "application/json"
            }
        });

        this.updateCardInLocal(updatedCard);
    }

    private updateCardInLocal(card: any) {

        for (const playerCard of this.adminCards) {

            if (playerCard.card.value.id.value === card.id.value) {

                playerCard.card.value = card;
            }
        }
    }
}