using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public interface IDataAccess
    {
        public Task<T> GetByIdAsync<T>(string id) where T : class;
        public Task<IEnumerable<T>> GetAllAsync<T>() where T : class;

        public  Task<IEnumerable<T>> GetWhereAsync<T>(Expression<Func<T, bool>> expression) where T : class;

        public  Task<int> CountAsync<T>() where T : class;

        public  Task<T> CreateAsync<T>(T entity) where T : class;
        public  Task UpdateAsync<T>(T entity) where T : class;
        public  Task DeleteAsync<T>(T entity) where T : class;
        public  Task BeginTransactionAsync();
        public Task CommitTransactionAsync();

        public Task RollbackTransactionAsync();

    }
}
