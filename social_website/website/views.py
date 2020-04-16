from django.shortcuts import render 
from django.http import HttpResponse
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser 
from rest_framework import status

from website.models import *
from website.serializers import *


@csrf_exempt
def register(request):
    user_data = JSONParser().parse(request)
    user_auth_serializer = UserAuthSerializer(data=user_data)
    if user_auth_serializer.is_valid(): 
        user_auth_serializer.save()

        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()

        return JsonResponse(user_auth_serializer.data, status=status.HTTP_201_CREATED) 
    return JsonResponse(user_auth_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@csrf_exempt
def login(request):
    user_data = JSONParser().parse(request)
    try: 
        user_auth = UserAuth.objects.get(pk=user_data['user_id']) 
    except UserAuth.DoesNotExist: 
        return HttpResponse('the unc id has not been registered.', status=status.HTTP_404_NOT_FOUND)

    if user_auth.password == user_data['password']:
        user = User.objects.get(pk=user_data['user_id'])
        return JsonResponse(UserSerializer(user).data) 

    return HttpResponse('incorrect password', status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def get_user(request, id):
    try: 
        user = User.objects.get(pk=id) 
    except User.DoesNotExist: 
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)
    user_serializer = UserSerializer(user)
    return JsonResponse(user_serializer.data, safe=False)



@csrf_exempt
def list_tags(request):
    if request.method == 'GET':
        tags = Tag.objects.all()
        tags_serializer = TagSerializer(tags, many=True)
        print(tags_serializer.data)
        return JsonResponse(tags_serializer.data, safe=False)

@csrf_exempt
def get_tag(request, id):
    try: 
        tag = Tag.objects.get(pk=id) 
    except Tag.DoesNotExist: 
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)
    tag_serializer = TagSerializer(tag)
    return JsonResponse(tag_serializer.data, safe=False)



@csrf_exempt
def list_notes(request, tag):
    print('Hello {}'.format(tag))
    if request.method == 'GET':
        notes = Note.objects.filter(tag_id=tag)
        print(notes)
        notes_serializer = NoteSerializer(notes, many=True)
        return JsonResponse(notes_serializer.data, safe=False)


@csrf_exempt
def list_comments(request, note_id):
    comments = Comment.objects.filter(note_id=note_id)
    comments_serializer = CommentSerializer(comments, many=True)
    return JsonResponse(comments_serializer.data, safe=False)


@csrf_exempt
def post_notes(request):
    note_data = JSONParser().parse(request)
    note_serializer = NoteSerializer(data=note_data)
    if note_serializer.is_valid():
        note_serializer.save()
        return JsonResponse(note_serializer.data, status=status.HTTP_201_CREATED) 
    return JsonResponse(note_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def post_comments(request):
    comment_data = JSONParser().parse(request)
    comment_serializer = CommentSerializer(data=comment_data)
    if comment_serializer.is_valid():
        comment_serializer.save()
        return JsonResponse(comment_serializer.data, status=status.HTTP_201_CREATED)
    return JsonResponse(note_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def search_notes(request, search_content):
    notes = Note.objects.filter(content__icontains=search_content)
    notes_serializer = NoteSerializer(notes, many=True)
    return JsonResponse(notes_serializer.data, safe=False)


@csrf_exempt
def liked(request, user_id, note_id):
    try:
        like = Like.objects.filter(user_id=user_id, note_id=note_id)
    except Like.DoesNotExist:
        like = None
    if like:
        return HttpResponse('true', status=status.HTTP_200_OK)
    return HttpResponse('false', status=status.HTTP_200_OK) 


@csrf_exempt
def like(request, user_id, note_id):
    user = UserAuth.objects.get(pk=user_id)
    note = Note.objects.get(pk=note_id)
    like = Like.create(user, note)
    like.save()
    print(like)
    return HttpResponse('true', status=status.HTTP_201_CREATED)


