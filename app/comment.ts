export class Comment {
    // public id: number;
    // public idPin: number;
    // public description: string;
    // public timestamp: number;
    private moderated:boolean= false;
    public photoUrl?: string;


  constructor(
    public idPin: number,
    public description: string,
    public timestamp: number
  ) {  }
}
