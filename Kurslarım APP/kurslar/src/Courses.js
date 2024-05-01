import Course from "./Course";

function Courses({ courses, removeCourse }) {
  //app.js parentinden gelen propsu aynı isimle geçtim ve aşağıda consolla teyit ettim
  // console.log(courses[2].title);
  return (
    <div className="courseWrapper">
      <div>
        <h2>Kurslarım</h2>
      </div>
      <div className="cardDiv">
        {courses.map((kurs) => {
          //app parentınden courses olarak gelen datanın(array) içinde map ile dönüp, her birini kurs olarak yakalayıp kurs propsu olarak bir alt compenende yolluyoruz

          return (
            <Course key={kurs.id} kurs={kurs} removeOneCourse={removeCourse} />
          ); //üzerinde dönülüp kursları Course compenendine props olarak geçtik
        })}
      </div>
    </div>
  );
}

export default Courses;
