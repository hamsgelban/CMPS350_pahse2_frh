import EcommerceRepo from "@/app/repo/frh-ecommerce-repo.js"

// Return all customers or curomer by name or cutomer by username
export async function GET(request) {
    let customers = []
    const { searchParams } = new URL(request.url)

    const name = searchParams.get('name')
    const username = searchParams.get('username')

    if (name) {
        customers = await EcommerceRepo.getCustomerByName(name)
    }
    else if (username) {
        customers = await EcommerceRepo.getCustomerByUsername(name)
    }
    else {
        customers = await EcommerceRepo.getCustomers()
    }

    return Response.json(customers, { status: 200 })
}


// Create new Customer
export async function POST(request) {
    const customer = await request.json()
    const newCustomer = await EcommerceRepo.addCustomer(customer)
    return Response.json(newCustomer, { status: 200 })
}
