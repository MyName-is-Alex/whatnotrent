namespace el_proyecte_grande.Daos;

public interface IDao<T>
{
    int Add(T item);
    void Remove(int id);

    T Get(int id);
    IEnumerable<T> GetAll();
}