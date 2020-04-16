from django.contrib import admin
from website.models import *
# Register your models here.
admin.site.register(Tag)
admin.site.register(UserAuth)
admin.site.register(User)
admin.site.register(Note)
admin.site.register(Comment)
admin.site.register(Like)