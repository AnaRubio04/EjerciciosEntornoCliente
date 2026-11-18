export class Task{
    constructor(id, title, description, priority, done, createdAt){
        this.id=Number(id);
        this.title=title;
        this.description=description;
        this.priority=priority;
        this.done=done;
        this.createdAt=createdAt;
    }
}