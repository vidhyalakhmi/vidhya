using Angularjs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Angularjs.Controllers
{
    public class StudentController : Controller
    {
        // GET: Student
        public ActionResult Student()
        {
            return View();
        }
        public string InsertStudentRecord(Student std)
        {
            using(StuEntities db =new StuEntities())
            {
                db.Students.Add(std);
                db.SaveChanges();
                return "Student Added SuccessFully....!";
            }
        }
        public JsonResult GetAllStudent()
        {
            using (StuEntities db =new StuEntities())
            {
                var AllRecord =db.Students.ToList();
                return Json(AllRecord ,JsonRequestBehavior.AllowGet);
            }
        }
        public string UpdateStudentRecord(Student std)
        {
            using (StuEntities db =new StuEntities())
            {
                var record=db.Students.Where(s => s.Id == std.Id).FirstOrDefault();
                record.Name = std.Name;
                record.Age = std.Age;
                record.Department = std.Department;
                db.SaveChanges();
                return "Updated SuccessFully...!";
            }
        }
        public string DeleteStudent(Student std) 
        {
            using (StuEntities db = new StuEntities())
            {
                var data =db.Students.Where(s => s.Id == std.Id).FirstOrDefault();
                db.Students.Remove(data);
                db.SaveChanges();
                return "Delete SucessFully..!";
            }

        }
    }
}