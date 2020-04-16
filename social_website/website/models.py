from django.db import models


class Tag(models.Model):
    title = models.CharField(max_length=50)
    image = models.ImageField(upload_to='image')

    class Meta:
        db_table = 'Tags'


class UserAuth(models.Model):
    user_id = models.CharField(max_length=10, primary_key=True)
    password = models.CharField(max_length=10)

    class Meta:
        db_table = 'UserAuth'


class User(models.Model):
    GENDER = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    )
    user_id = models.OneToOneField(UserAuth, on_delete=models.CASCADE, primary_key=True)
    name = models.CharField(max_length=70)
    email = models.EmailField(max_length=20, null=True)
    gender = models.CharField(max_length=1, choices=GENDER)
    department = models.CharField(max_length=50)
    avatar = models.ImageField(upload_to='image/avatar', null=True)

    class Meta:
        db_table = 'Users'


class Note(models.Model):
    user_id = models.ForeignKey(UserAuth, on_delete=models.CASCADE)
    content = models.CharField(max_length=100)
    post_time = models.DateTimeField()
    tag_id = models.ForeignKey(Tag, on_delete=models.CASCADE)

    class Meta:
        db_table = 'Notes'


class Comment(models.Model):
    note_id = models.ForeignKey(Note, on_delete=models.CASCADE)
    user_id = models.ForeignKey(UserAuth, on_delete=models.CASCADE)
    content = models.CharField(max_length=50)
    post_time = models.DateTimeField()

    class Meta:
        db_table = 'Comments'


class Like(models.Model):
    user_id = models.ForeignKey(UserAuth, on_delete=models.CASCADE)
    note_id = models.ForeignKey(Note, on_delete=models.CASCADE)

    @classmethod
    def create(cls, user_id, note_id):
        like = cls(user_id=user_id, note_id=note_id)
        return like

    class Meta:
        db_table = 'Likes'
        unique_together = (('user_id', 'note_id'),)
