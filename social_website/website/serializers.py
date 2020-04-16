from rest_framework import serializers 
from website.models import *


class UserAuthSerializer(serializers.ModelSerializer):

	class Meta:
		model = UserAuth
		fields = ('user_id',
				  'password',
				 )

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('user_id',
        		  'email',
                  'name',
                  'gender',
                  'department',
                  'avatar',
                  )


class NoteSerializer(serializers.ModelSerializer):

	class Meta:
		model = Note
		fields = ('id',
				  'content',
				  'post_time',
				  'user_id',
				  'tag_id',
				 )


class CommentSerializer(serializers.ModelSerializer):

	class Meta:
		model = Comment
		fields = ('id',
				  'content',
				  'post_time',
				  'note_id',
				  'user_id',
				 )



class TagSerializer(serializers.ModelSerializer):

	class Meta:
		model = Tag
		fields = ('id',
				  'title',
				  'image',
				 )


class LikeSerializer(serializers.ModelSerializer):

	class Meta:
		model = Like
		fields = ('user_id',
				  'note_id',
				 )
