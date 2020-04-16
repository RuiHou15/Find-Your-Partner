export class Note {
	id: number;
	user_id: string;
	content: string;
	post_time: Date;
	tag_id: number;

	constructor(user_id:string, content:string, post_time:Date, tag_id: number) {
		this.user_id = user_id;
		this.content = content;
		this.post_time = post_time;
		this.tag_id = tag_id;
	}
}