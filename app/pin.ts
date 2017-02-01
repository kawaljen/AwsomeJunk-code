export class Pin {
    public id: number;
    public name: string;
    public lat: number;
    public lng: number;
    public description: string;
    public timestamp: number;
    private moderated:boolean= false;
    public photoUrl?: string;
    public adress?: string;
  // constructor(
  //   public id: number,
  //   public name: string,
  //   public lat: number,
  //   public lng: number,
  //   public description: string,
  //   public timestamp: number,
  //   private moderated:boolean= false,
  //   public photoUrl?: string,
  //   public adress?: string,
  // ) {  }

}
