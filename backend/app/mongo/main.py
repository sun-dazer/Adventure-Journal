from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
        
def check(user, passw):
    with client.start_session(causal_consistency=True) as session:
        account = client.get_database("local").get_collection("accounts").find_one({"username":user})
        if account is not None:
            return account["password"] == passw
    return False

def make_account(user, passw):
    with client.start_session(causal_consistency=True) as session:
        collection = client.get_database("local").get_collection("accounts")
        account = collection.find_one({"username":user})
        if account is not None:
            return False
        collection.insert_one({"username":user, "password":passw})
        return True

def delete_account(user, passw):
    if not check(user, passw):
        return False
    with client.start_session(causal_consistency=True) as session:
        client.get_database("local").get_collection("accounts").delete_many({"username":user})
    return False