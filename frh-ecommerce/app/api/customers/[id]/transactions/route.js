import EcommerceRepo from "@/app/repo/frh-ecommerce-repo.js"

// ADD  transaction
export async function POST(request, { params }) {
    const customerID = parseInt(params.id)
    const transaction = await request.json()
    const newTransaction = await EcommerceRepo.addTransaction(customerID, transaction)
    return Response.json(newTransaction, { status: 200 })
}