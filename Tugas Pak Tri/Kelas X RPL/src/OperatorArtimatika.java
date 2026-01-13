public class OperatorArtimatika {
    
    public static void main(String[] args) {
//        Operator Aritmatika

    int a= 10;
    int b= 6;
    
    int penjumlahan= a+b;
    int pengurangan= a-b;
    int perkalian= a*b;
    double pembagian= a/b;
    int modulus=a%b;
     
        System.out.println("Hasil dari Penjumlahan adalah " +penjumlahan);
        System.out.println("Hasil dari Pengurangan adalah " +pengurangan);
        System.out.println("Hasil dari Perkalian adalah " +perkalian);
        System.out.println("Hasil dari Pembagian adalah "+pembagian);
        System.out.println("Hasil dari Modulus adalah " +modulus);
        
//        Operator Penugasan
        
        int c=20;
        
        c +=5;
        a -=2;
        b *=100;
        
        System.out.println(c);
        System.out.println(a);
        System.out.println(b);
        
        int d=50;
        int e=10;
        
        boolean hasil1=d==e;
        boolean hasil2=d>=e;
        boolean hasil3=d!=e;
        boolean hasil4=d<=e;
                        
        System.out.println(hasil1);
        System.out.println(hasil2);
        System.out.println(hasil3);
        System.out.println(hasil4);
        
//        Operator Logika

        boolean result1 = true && true;
        boolean result2 = d>e && d==e;
        boolean result3 = true || true;
        boolean result4 = d!=e || d<=e;
                
        System.out.println(result1);
        System.out.println(result2);
        System.out.println(result3);
        System.out.println(result4);
        
    }
}
