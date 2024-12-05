from django.urls import path

from . import views


urlpatterns = [
    path("register", views.register, name="register"),
    path("login", views.login, name="login"),
    path("logout/", views.logout, name="logout"),
    path("deregister", views.deregister, name="deregister"),
    path("save-tip/", views.save_tip_view, name="save-tip"),
    path("get-tips/", views.get_tips_view, name="get-tips"),
    path("get_user_info/", views.get_user_info, name="get_user_info"),
    path("upvote/", views.upvote, name="upvote"),
    path("follow/", views.follow, name="follow"),
]