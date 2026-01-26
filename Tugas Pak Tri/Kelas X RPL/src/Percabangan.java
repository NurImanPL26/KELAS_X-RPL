import java.util.Scanner;

public class Percabangan {
    public static void main(String[] args) {
   
        
        Scanner InputUser= new Scanner(System.in);
        
        // Int
        System.out.print("Masukan nilai anda : ");
        int nilai= InputUser.nextInt();
        System.out.print("Nilai anda adalah : " +nilai);
                
        if (nilai>100) {
            System.out.println("A+");
      } else if (nilai >90) {
          System.out.println("A");
      } else if (nilai >70) {
          System.out.println("B");
      } else if (nilai >60) {
          System.out.println("C");
      } else if (nilai >50) {
          System.out.println("D");
      }
          
        // Double
        System.out.print("Masukan IPK anda : ");
        double ipk = InputUser.nextDouble();
        System.out.print("IPK anda adalah : " + ipk);

        if (ipk >= 3.00) {
          System.out.println("IPK Anda Baik");
      } else {
          System.out.println("IPK Anda Perlu Ditingkatkan");
      }


        // Char
        System.out.print("Masukan grade anda (A/B/C) : ");
        char grade = InputUser.next().charAt(0);
        System.out.print("Grade anda adalah : " + grade);

        if (grade == 'A') {
            System.out.println("Sangat Memuaskan");
        } else {
            System.out.println("Cukup");
        }


        // Boolean
        System.out.print("Apakah anda sudah absen? (true/false) : ");
        boolean absen = InputUser.nextBoolean();
        System.out.print("Status absen : " + absen);

        if (absen) {
            System.out.println("Anda Sudah Absen");
        } else {
            System.out.println("Anda Belum Absen");
        }

    }
}
