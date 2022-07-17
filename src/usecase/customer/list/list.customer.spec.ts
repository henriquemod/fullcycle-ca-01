import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "John",
  new Address("Street 1", 123, "Zipcode 1", "City 1")
);

const customer2 = CustomerFactory.createWithAddress(
  "Jane",
  new Address("Street 2", 321, "Zipcode 2", "City 2")
);

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
  };
};

describe("Unit test for listing customer use case", () => {
  it("should list a customer", async () => {
    const customerRepository = MockRepository();
    const customerListUseCase = new ListCustomerUseCase(customerRepository);

    const output = await customerListUseCase.execute({});

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toEqual(customer1.id);
    expect(output.customers[0].name).toEqual(customer1.name);
    expect(output.customers[0].address.street).toEqual(
      customer1.Address.street
    );
    expect(output.customers[1].id).toEqual(customer2.id);
    expect(output.customers[1].name).toEqual(customer2.name);
    expect(output.customers[1].address.street).toEqual(
      customer2.Address.street
    );
  });
});
