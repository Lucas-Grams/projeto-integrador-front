export class Endereco{
   id: number;
   rua: String;
   cep: String;
   numero: String;
   complemento: String;
   bairro: String;
   cidade: String;
   uf: String;
   latitude: String;
   longitude: String;

   constructor() {
      this.id = 0;
      this.rua = '';
      this.cep = '';
      this.numero = '';
      this.complemento = '';
      this.bairro = '';
      this.cidade = '';
      this.uf = '';
      this.latitude = '';
      this.longitude = '';
   }
}
