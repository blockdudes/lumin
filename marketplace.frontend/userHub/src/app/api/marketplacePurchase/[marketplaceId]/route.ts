import { apolloClient } from '@/lib/client';
import { ApolloError, gql } from "@apollo/client";

export const GET = async (request: any, { params }: { params: { marketplaceId: string } }) => {
    try {

        const identifier = params.marketplaceId.toString();

        try {
            const purchase_marketplace = await apolloClient.query({
                query: gql`
                    query GetMarketplace($identifier: String!) {
                        purchases(where: { marketplace_: { id: $identifier }}) {
                        id
                        buyer {
                            id
                        }
                        price
                        feePaid
                        transactionDate
                        resource {
                            id
                            creator{
                            id
                            }
                            title
                            description
                            category
                            image_url
                            resourceHash
                            transactionDate
                        }
                    }
                }
            `,
            variables:{
                identifier: identifier
            }
            })

            const purchases = purchase_marketplace.data.purchases.map((purchase: any) => {
                return {
                    id: purchase.id,
                    buyer: purchase.buyer.id,
                    price: purchase.price,
                    feePaid: purchase.feePaid,
                    transactionDate: purchase.transactionDate,
                    resource: purchase.resource
                }
            })


            return new Response(JSON.stringify({ purchases: purchases }), { status: 200 });

        } catch (error) {
            return new Response(JSON.stringify({ error: `unable to fetch from subgraph: ${error}` }), { status: 500 });
        

        }

    } catch (error) {
        console.error('Error fetching user:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
