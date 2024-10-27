from django.shortcuts import render
from django.http import HttpResponse
from .mongo.main import check, make_account, delete_account
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def register(request):
    if request.method == "POST":
        if make_account(request.POST.get("username"), request.POST.get("password")):
            return HttpResponse({"msg": "Success"}, status=200)
        return HttpResponse({"msg": "Account already exists with that name!"}, status=400)

@csrf_exempt
def login(request):
    if request.method == "OPTIONS":
        response = HttpResponse()
        response["Access-Control-Allow-Origin"] = "http://localhost:3000"
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "X-CSRFToken, Content-Type"
        return response
    if request.method == "POST":
        if check(request.POST.get("username"), request.POST.get("password")):
            return HttpResponse(str({"msg": "Success"}), status=200)
        return HttpResponse("{msg: 'Username or password were incorrect!'}", status=400)

@csrf_exempt
def deregister(request):
    if request.method == "POST":
        if delete_account(request.POST.get("username"), request.POST.get("password")):
            return HttpResponse({"msg": "Success"}, status=200)
        return HttpResponse({"msg": "Account credentials incorrect!"}, status=400)