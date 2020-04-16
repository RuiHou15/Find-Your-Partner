from django.conf.urls import url 
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from website import views 


urlpatterns = [ 
    url(r'^login/$', views.login),
    url(r'^users/register/$', views.register),
    url(r'^users/(?P<id>[a-zA-Z0-9]+)$', views.get_user),
    url(r'^tags/$', views.list_tags),
    url(r'^tags/(?P<id>[0-9]+)$', views.get_tag),
    url(r'^notes/(?P<tag>[0-9]+)$', views.list_notes),
    url(r'^notes/post/$', views.post_notes),
    url(r'^liked/(?P<user_id>[a-zA-Z0-9]+)/(?P<note_id>[0-9]+)$', views.liked),
    url(r'^like/(?P<user_id>[a-zA-Z0-9]+)/(?P<note_id>[0-9]+)$', views.like),
    url(r'^notes/comment/$', views.post_comments),
    url(r'^comments/(?P<note_id>[0-9]+)$', views.list_comments),
    url(r'^search/(?P<search_content>[a-zA-Z0-9]+)$', views.search_notes),
    url(r'^admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
