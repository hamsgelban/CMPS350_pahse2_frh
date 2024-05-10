import EcommerceRepo from "@/app/repo/frh-ecommerce-repo.js"


// GET specific Artist
export async function GET(request) {
    const objs = await EcommerceRepo.totalPurchasesPerCity()
    return Response.json({ objs }, { status: 200 })
}
