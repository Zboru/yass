package main
import (
     "fmt"
     "math/rand"
     "time"
)

func random_int(min, max int) int {
     x := rand.NewSource(time.Now().UnixNano())
     y := rand.New(x)
     return y.Intn(max - min) + min
}

func insert_random(arr [][]int) {
     for _, row := range(arr) {
          for index, cell := range(row) {
               if cell == 0 {
                    rand := random_int(1,10)
                    // fmt.Println(rand)
                    row[index] = rand
               }
          }
          fmt.Println(row)
     }
}

func check_sudoku(sudoku [][]int) bool {
     rowsFlag := check_rows(sudoku)
     return rowsFlag
}

// func check_box()
// func check_col()
func row_duplicate(arr []int) bool {
   visited := make(map[int]bool, 0)
   for i:=0; i<len(arr); i++{
      if visited[arr[i]] == true{
         return true
      } else {
         visited[arr[i]] = true
      }
   }
   return false
}

func check_rows(arr [][]int) bool {
     var rowFlag bool
     for _, row := range(arr) {
          rowFlag = row_duplicate(row)
          if rowFlag == true {
               break
          }
     }
     return !rowFlag
}

func main() {
     sudoku := [][]int{
          {0,0,6,0,1,9,4,2,7},
          {0,2,0,7,0,0,9,0,0},
          {0,7,0,0,5,0,0,8,3},
          {7,0,0,0,6,0,5,9,8},
          {0,0,8,9,0,0,0,0,0},
          {0,9,1,0,0,5,7,0,0},
          {0,6,0,5,0,3,8,7,1},
          {0,0,0,0,0,0,3,0,9},
          {4,3,7,1,0,8,0,5,0},
     }
     validRows := false
     for validRows == false {
          insert_random(sudoku)
          validRows = check_sudoku(sudoku)
          fmt.Println(validRows)
     }
     // loop := 0
     // for loop < 5 {
     //      fmt.Println(random_int(1,10))
     //      loop += 1
     // }
   
}
