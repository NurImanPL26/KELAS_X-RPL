import java.util.Scanner;

public class InputOutput {
    public static void main(String[] args) {
        
        Scanner InputUser= new Scanner(System.in);
            System.out.print("Masukan nama anda : ");
            String nama= InputUser.nextLine();
            System.out.print("nama anda adalah : " +nama);
                
            System.out.print("Masukan absen anda : ");
            int absen= InputUser.nextInt();
            System.out.print("absen anda adalah : " +absen);
            
            System.out.print("Masukan Tinggi Badan anda : ");
            double tinggi= InputUser.nextDouble();
            System.out.print("Tinggi Badan anda adalah : " +tinggi);
            
            System.out.print("Masukan Berat Badan anda : ");
            float berat= InputUser.nextFloat();
            System.out.print("Berat Badan anda adalah : " +berat);
            
            System.out.print("Masukan NIK anda : ");
            long NIK= InputUser.nextLong();
            System.out.print("NIK anda adalah : " +NIK);
            
            System.out.print("Masukan Jenis Kelamin anda : ");
            boolean jk= InputUser.nextBoolean();
            System.out.print("Jenis Kelamin anda adalah : " +jk);
            
            Scanner masukan= new Scanner(System.in);
            System.out.print("Masukan character anda : ");
            String simbol= masukan.nextLine();
            System.out.print("character anda adalah : " +simbol);
    }
}