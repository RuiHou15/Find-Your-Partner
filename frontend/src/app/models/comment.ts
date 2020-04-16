export class Comment {
	id: number;
	note_id: number;
	user_id: string;
	content: string;
	post_time: Date;

	constructor(note_id:number, user_id:string, content:string, post_time:Date) {
		this.note_id = note_id;
		this.user_id = user_id;
		this.content = content;
		this.post_time = post_time;

	}
}