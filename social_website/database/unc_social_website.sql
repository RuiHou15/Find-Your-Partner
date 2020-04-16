drop database if exists unc_social; 
create database unc_social;
use unc_social;

create table user(
	uid varchar(8) not null,
	uname varchar(20) not null,
	password varchar(20) not null,
	gender enum('m', 'f') not null,
	primary key (uid)
);

create table tag(
	tid int auto_increment primary key,
	content varchar(10) not null
);

create table user_tag(
	uid varchar(8),
	tid int,
	primary key(uid, tid),
	foreign key (uid) references user(uid),
	foreign key (tid) references tag(tid)
);

create table note(
	nid int auto_increment primary key,
	uid varchar(8) not null,
	content varchar(20) not null,
	time datetime not null,
	foreign key (uid) references user(uid)
);

create table note_tag(
	nid int auto_increment,
	tid int,
	primary key (nid, tid),
	foreign key (nid) references note(nid),
	foreign key (tid) references tag(tid)
);

create table comment(
	cid int auto_increment primary key,
	nid int not null,
	uid varchar(8) not null,
	replytocid int,
	content varchar(20),
	time datetime not null
);

