package com.mycompany.belajarjava;
import java.util.Scanner;

public class BelajarLooping {

    public static void main(String[] args) {
        
        Scanner inputUser = new Scanner(System.in);
        
        System.out.println("Masukkan tinggi segitiga : ");
        int tinggi = inputUser.nextInt();
        
//        for(int a=1; a<=5; a++)
//            System.out.println("Iman Ke-" +a);
        
//        for (int a = 1; a <= 5; a++) {
//            for (int b = 1; b <= a; b++) {
//                System.out.print("+");
//            }
//                System.out.println();
//            }
        
//        for (int a = 1; a <= 5; a++) {
//            for (int b = 5; b >= a; b--) {
//                System.out.print("+");
//            }
//                System.out.println();
//            }

//        for (int a = 1; a <=tinggi; a++) {
//            for (int b = tinggi; b > a; b++) {
//                System.out.print(" ");
//            }
//            for (int c = 1; c <= a; c--) {
//                System.out.print("+");
//            }
//                System.out.println();
//            }
        
        for (int a = 1; a <=tinggi; a++) {
            for (int b = tinggi; b > a; b--) {
                System.out.print(" ");
            }
            for (int c = 1; c <= a; c++) {
                System.out.print("+");
            }
                System.out.println();
            }
        
    }
    
}
