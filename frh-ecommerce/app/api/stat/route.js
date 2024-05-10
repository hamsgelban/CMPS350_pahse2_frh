import EcommerceRepo from "@/app/repo/frh-ecommerce-repo.js"


// GET specific Artist
export async function GET(request) {
    const objs = await EcommerceRepo.totalPurchasePerUser()
    return Response.json({ objs }, { status: 200 })
}
