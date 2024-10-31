from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
        
def check(user, passw):
    with client.start_session(causal_consistency=True) as session:
        # Access the collection and attempt to find the account by username
        collection = client.get_database("local").get_collection("accounts")
        account = collection.find_one({"username": user})
        
        # Debugging: Print the retrieved account data
        print("Retrieved account:", account)

        # Check if the account exists and if the password matches
        if account:
            print("Account found for user:", user)
            print("Stored password:", account["password"])
            print("Provided password:", passw)
            return account["password"] == passw
        
        # If no account was found
        print("No account found with username:", user)
        return False

def make_account(first_name, last_name, dob, user, passw):
    with client.start_session(causal_consistency=True) as session:
        collection = client.get_database("local").get_collection("accounts")
        account = collection.find_one({"username":user})
        if account is not None:
            return False
        collection.insert_one({"first_name": first_name, "last_name": last_name, "dob": dob, "username":user, "password":passw})
        return True

def delete_account(user, passw):
    if not check(user, passw):
        return False
    with client.start_session(causal_consistency=True) as session:
        client.get_database("local").get_collection("accounts").delete_many({"username":user})
    return False