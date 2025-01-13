import { describe, it, afterEach, mock } from "node:test";
import assert from "node:assert/strict";
import { ObjectId } from "mongodb";

const servicePath = "../../src/services/user.service.js";
const databaseErrorMessage = "Database connection failed";
const idAsString = new ObjectId().toString();
const idAsObject = ObjectId.createFromHexString(idAsString);

const mockProject = mock.fn();
const mockInsertOne = mock.fn();
const mockFindOne = mock.fn();
const mockFind = mock.fn();
const mockUpdateOne = mock.fn();
const mockDeleteOne = mock.fn();

const mockCollection = mock.fn(() => ({
    insertOne: mockInsertOne,
    findOne: mockFindOne,
    find: mockFind,
    updateOne: mockUpdateOne,
    deleteOne: mockDeleteOne,
}));

const mockDb = mock.fn(async () => ({ collection: mockCollection }));

// Attach everything to the mock.module
mock.module("../../src/helpers/mongo.helper.js", {
    namedExports: {
        getDb: mockDb,
        ObjectId: { createFromHexString: (x) => ObjectId.createFromHexString(x) },
    },
});

describe("services", () => {
    describe("user.service", () => {
        afterEach(() => {
            mockDb.mock.resetCalls();
            mockCollection.mock.resetCalls();
        });

        describe("insertOne", () => {
            it("should create a user", async () => {
                mockInsertOne.mock.mockImplementationOnce(() => ({ insertedId: idAsObject }));
                const user = { id: 1, name: "User1" };

                // Act
                const { insertOne } = await import(servicePath);
                const userId = await insertOne(user);

                // Assert
                assert.ok(userId instanceof ObjectId);
                assert.equal(mockInsertOne.mock.calls.length, 1);
                assert.equal(mockInsertOne.mock.calls[0].arguments[0], user);
            });

            it("should throw an error if user creation fails", async () => {
                mockDb.mock.mockImplementationOnce(() => {
                    throw new Error(databaseErrorMessage);
                });

                // Or use assert.reject: https://nodejs.org/docs/latest-v22.x/api/assert.html#assertrejectsasyncfn-error-message
                try {
                    const { insertOne } = await import(servicePath);
                    await insertOne();
                } catch (error) {
                    assert.equal(error.message, `Error creating users: ${databaseErrorMessage}`);
                }
            });
        });

        describe("getAll", () => {
            it("should return all users and not expose the passwords", async () => {
                const mockUsers = [{ id: 1, name: "User1" }];
                mockProject.mock.mockImplementationOnce(() => ({
                    toArray: () => Promise.resolve(mockUsers),
                }));
                mockFind.mock.mockImplementationOnce(() => ({ project: mockProject }));

                // Act
                const { getAll } = await import(servicePath);
                const users = await getAll();

                // Assert
                assert.equal(users.length, 1);
                assert.equal(users[0], mockUsers[0]);
                assert.equal(mockFind.mock.calls.length, 1);
                assert.equal(mockProject.mock.calls.length, 1);
                assert.deepEqual(mockProject.mock.calls[0].arguments[0], { password: 0 });
            });

            it("should throw an error if database query fails", async () => {
                mockDb.mock.mockImplementationOnce(() => {
                    throw new Error(databaseErrorMessage);
                });

                try {
                    const { getAll } = await import(servicePath);
                    await getAll();
                } catch (error) {
                    assert.equal(error.message, `Error retrieving users: ${databaseErrorMessage}`);
                }
            });
        });

        describe("getOneById", () => {
            it("should return a user by Id", async () => {
                const expectedUser = { _id: idAsObject, name: "John Doe" };
                mockFindOne.mock.mockImplementationOnce(() => expectedUser);

                // Act
                const { getOneById } = await import(servicePath);
                const user = await getOneById(idAsString);

                // Assert
                assert.equal(user, expectedUser);
                assert.equal(mockDb.mock.calls.length, 1);
                assert.equal(mockCollection.mock.calls.length, 1);
                assert.equal(mockFindOne.mock.calls.length, 1);
                assert.deepEqual(mockFindOne.mock.calls[0].arguments[0], { _id: idAsObject });
            });

            it("should throw an error if database query fails", async () => {
                mockDb.mock.mockImplementationOnce(() => {
                    throw new Error(databaseErrorMessage);
                });

                try {
                    const { getOneById } = await import(servicePath);
                    await getOneById(idAsString);
                } catch (error) {
                    assert.equal(error.message, `Error retrieving user: ${databaseErrorMessage}`);
                }
            });
        });

        describe("updateOne", () => {
            it("should update a user successfully", async () => {
                const user = { _id: idAsObject, name: "John Doe" };
                mockUpdateOne.mock.mockImplementationOnce(() => ({ matchedCount: 1 }));

                // Act
                const { updateOne } = await import(servicePath);
                const actualMatchedCount = await updateOne(idAsString, user);

                // Assert
                assert.equal(actualMatchedCount, 1);
                assert.equal(mockDb.mock.calls.length, 1);
                assert.equal(mockCollection.mock.calls.length, 1);
                assert.equal(mockUpdateOne.mock.calls.length, 1);
                assert.deepEqual(mockUpdateOne.mock.calls[0].arguments[0], { _id: ObjectId.createFromHexString(idAsString) });
                assert.deepEqual(mockUpdateOne.mock.calls[0].arguments[1], { $set: user });
            });

            it("should throw an error if update fails", async () => {
                mockDb.mock.mockImplementationOnce(() => {
                    throw new Error(databaseErrorMessage);
                });

                try {
                    const { updateOne } = await import(servicePath);
                    await updateOne(idAsString);
                } catch (error) {
                    assert.equal(error.message, `Error updating user: ${databaseErrorMessage}`);
                }
            });
        });

        describe("deleteOneById", () => {
            it("should delete a user successfully", async () => {
                mockDeleteOne.mock.mockImplementationOnce(() => ({ deletedCount: 1 }));

                // Act
                const { deleteOneById } = await import(servicePath);
                const actualDeletedCount = await deleteOneById(idAsString);

                // Assert
                assert.equal(actualDeletedCount, 1);
                assert.equal(mockDb.mock.calls.length, 1);
                assert.equal(mockCollection.mock.calls.length, 1);
                assert.equal(mockDeleteOne.mock.calls.length, 1);
                assert.deepEqual(mockDeleteOne.mock.calls[0].arguments[0], { _id: ObjectId.createFromHexString(idAsString) });
            });

            it("should throw an error if delete fails", async () => {
                mockDb.mock.mockImplementationOnce(() => {
                    throw new Error(databaseErrorMessage);
                });

                try {
                    const { deleteOneById } = await import(servicePath);
                    await deleteOneById(idAsString);
                } catch (error) {
                    assert.equal(error.message, `Error deleting user: ${databaseErrorMessage}`);
                }
            });
        });
    });
});
