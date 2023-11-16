namespace app.Models
{
    public class Person
    {
        public long id {  get; set; }
        public String primeiroNome { get; set; }
        public String sobrenome { get; set; }
        public DateOnly nascimento { get; set; }
        public Boolean sexoHomem { get; set; }
        public String cargo { get; set; }
        public String tipoCargo { get; set; }
        public String signo { get; set; }
    }
}
