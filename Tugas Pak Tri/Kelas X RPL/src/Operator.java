public class Operator {
    
    public static void main(String[] args) {
        //Operator Aritmatika
        int a=10;
        int b=3;
        
        int penjumlahan=a+b;
        int pengurangan=a-b;
        int perkalian=a*b;
        double pembagian=a/b;
        int modulus=a%b;
        
        System.out.println("Hasil Penjumlahan: "+penjumlahan);
        System.out.println("Hasil Pengurangan: "+pengurangan);
        System.out.println("Hasil Perkalian: "+perkalian);
        System.out.println("Hasil Pembagian: "+pembagian);
        System.out.println("Hasil Modulus: "+modulus);
        
        //Operator Penugasan
        //=
        //+=
        //-=
        //*=
        // /=
        // %/
        
        int c=20;
                
        c +=5;
        a -=2;
        b *=100;
        
        System.out.println(c);
        System.out.println(a);
        System.out.println(b);
        
        //Operator Pembanding
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
        
        //Operator Logika
        boolean result = true && true;
        boolean result1 = d>e && d==e;
        boolean result2 = true || true;
        boolean result3 = d!=e || d<e;
        
        System.out.println(result);
        System.out.println(result1);
        System.out.println(result2);
        System.out.println(result3);
    }
    
}